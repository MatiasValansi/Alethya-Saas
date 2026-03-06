from dataclasses import dataclass, field
from typing import Optional
from uuid import UUID, uuid4

@dataclass
class Client:
    dni: str
    name: str
    tenant_id: UUID
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None    
    id: UUID = field(default_factory=uuid4)
    
    def email_is_valid(self) -> bool:
        """Valida que el correo electrónico tenga un formato correcto."""
        import re
        pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(pattern, self.email) is not None
    
    def __post_init__(self):
        """Validaciones automáticas al crear la entidad."""
        if not self.name or len(self.name.strip()) < 2:
            raise ValueError("El nombre del cliente debe tener al menos 2 caracteres.")
        if not self.dni or len(self.dni) < 5:
            raise ValueError("El DNI proporcionado no es válido.")