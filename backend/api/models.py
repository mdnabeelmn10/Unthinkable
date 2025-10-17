from django.db import models


class SymptomQuery(models.Model):
    symptoms = models.TextField()
    response_text = models.TextField(blank=True)
    response_json = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Query {self.id} @ {self.created_at:%Y-%m-%d %H:%M}"