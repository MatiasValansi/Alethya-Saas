from app.domain.entities.client import Client


def test_client_email_validation_works(sample_client:Client):
    """
    Test de humo: Verifica que la lógica de la entidad Client 
    funciona correctamente con las fixtures.
    """
    # El sample_client viene con "juan@alethya.com" (Válido)
    assert sample_client.email_is_valid() is True

    # Cambiamos a un email inválido
    sample_client.email = "email_sin_arroba.com"
    assert sample_client.email_is_valid() is False