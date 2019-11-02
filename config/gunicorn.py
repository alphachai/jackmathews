# import os
# from multiprocessing import cpu_count
#
# import environ
# from mintel_logging import LogLevel
# from mintel_logging.contrib import BaseGunicornLogger
#
# is_development = os.path.exists(str((environ.Path(__file__) - 2).path(".env")))
# env = environ.Env()
# cpu_reservation = env("DJANGO_CPU", default=512)
#
# workers = 2 if is_development else (cpu_reservation // 256) + 1
# bind = ["0.0.0.0:80"]
# accesslog = "-"
# errorlog = "-"
#
#
# class GunicornLogger(BaseGunicornLogger):
#     SERVICE = "jackmathews.com"
#     LEVEL = env(
#         "MINTEL_LOGGING_LEVEL", default=LogLevel.INFO, cast=LogLevel.__members__.get
#     )
#
#
# logger_class = GunicornLogger
#
# for k, v in os.environ.items():
#     if k.startswith("GUNICORN_"):
#         key = k.split("_", 1)[1].lower()
#         locals()[key] = v
