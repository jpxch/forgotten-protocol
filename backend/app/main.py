from app.api.router import router
from app.core.config import setttings

app = FastApi(
    title="Forgotten Protocols API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.cors_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix=settings.api_prefix)