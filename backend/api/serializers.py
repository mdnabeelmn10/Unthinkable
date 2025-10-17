from rest_framework import serializers
from .models import SymptomQuery


class SymptomQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = SymptomQuery
        fields = ['id', 'symptoms', 'response_text', 'response_json', 'created_at']
        read_only_fields = ['response_text', 'response_json', 'created_at']