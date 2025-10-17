import os
import json
import re
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from google import genai  # for Gemini API (pip install google-genai)

# Example model for optional query logging (if you have a SymptomQuery model)
# from .models import SymptomQuery

@api_view(['POST'])
def symptom_checker(request):
    symptoms = request.data.get('symptoms', '').strip()
    if not symptoms:
        return Response({'detail': 'Symptoms required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Optionally log user query in DB
    # q = SymptomQuery.objects.create(symptoms=symptoms)

    # Construct prompt carefully
    prompt = (
        "You are a medical-knowledge assistant providing educational, non-diagnostic information."
        " Given the user's symptom text below, list up to 5 possible conditions (common-to-uncommon),"
        " an approximate confidence percentage (for educational purposes only), short notes that justify each,"
        " and recommended next steps (triage advice, tests that might be considered, red flags)."
        " Always include a clear educational disclaimer that this is not medical advice and recommend seeing a healthcare professional for diagnosis."
        f"\n\nUser symptoms: {symptoms}\n\nRespond in JSON with keys: conditions (list of {{name, confidence, notes}}), next_steps (list of strings), disclaimer (string)."
    )

    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

    if GEMINI_API_KEY:
        try:
            client = genai.Client(api_key=GEMINI_API_KEY)
            response = client.models.generate_content(
                model="gemini-2.5-flash",  # or gemini-1.5-pro
                contents=prompt,
            )
            text = response.text
            parsed = None

            # Try parsing JSON
            try:
                parsed = json.loads(text)
            except Exception:
                m = re.search(r"\{[\s\S]*\}", text)
                if m:
                    try:
                        parsed = json.loads(m.group(0))
                    except Exception:
                        parsed = None

            if parsed is None:
                parsed = {
                    'conditions': [],
                    'next_steps': [],
                    'disclaimer': 'Could not parse model output. See a healthcare professional.'
                }

            # Save to DB if using a model
            # q.response_text = text
            # q.response_json = parsed
            # q.save()

            return Response(parsed)

        except Exception as e:
            # q.response_text = f'Error: {str(e)}'
            # q.save()
            return Response({'detail': 'LLM request failed', 'error': str(e)}, status=status.HTTP_502_BAD_GATEWAY)

    else:
        # No Gemini key — safe fallback response
        example = {
            'conditions': [
                {'name': 'Common cold', 'confidence': 35, 'notes': 'Upper respiratory symptoms, low fever.'},
                {'name': 'Acute pharyngitis', 'confidence': 25, 'notes': 'Sore throat prominent.'}
            ],
            'next_steps': [
                'Rest, fluids, symptomatic care (paracetamol/ibuprofen as appropriate).',
                'If high fever > 39°C, severe shortness of breath, confusion, or symptoms worsen — seek emergency care.'
            ],
            'disclaimer': 'Educational only — not a diagnosis. See a healthcare professional for assessment.'
        }
        # q.response_text = json.dumps(example)
        # q.response_json = example
        # q.save()
        return Response(example)
