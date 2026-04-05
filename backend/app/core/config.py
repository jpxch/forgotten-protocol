from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "forgotten-protocols-backend"
    app_env: str = "dev"
    api_prefix: str = "/v1"
    database_url: str = "sqlite:///./data/forgotten_protocols.db"
    cors_origin: str = "https://localhost:3000"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()