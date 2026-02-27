from dataclasses import dataclass, field
from uuid import UUID, uuid4

@dataclass
class Client:
    dni: str
    name: str
    email: str
    phone: str
    address: str
    id: UUID = field(default_factory=uuid4)
    
    def email_is_valid(self) -> bool:
        """Valida que el correo electrónico tenga un formato correcto."""
        import re
        pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(pattern, self.email) is not None