from django.apps import AppConfig

# from TSG_App import signals as signals
class TsgAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'TSG_App'
    def ready(self):
        import TSG_App.signals
