import * as React from "react"
import { Check, ChevronsUpDown, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProducts } from "@/hooks/useProducts"

interface ProductSelectorProps {
  onSelect: (productId: string) => void;
}

export function ProductSelector({ onSelect }: ProductSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const { products } = useProducts()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 opacity-50" />
            <span>Añadir producto...</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar por nombre o código..." />
          <CommandList>
            <CommandEmpty>Producto no encontrado.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.name}
                  onSelect={() => {
                    onSelect(product.id!)
                    setOpen(false)
                  }}
                  disabled={product.stock <= 0}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col">
                      <span className={product.stock <= 0 ? "text-muted-foreground line-through" : ""}>
                        {product.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">Stock: {product.stock}</span>
                    </div>
                    <span className="font-bold text-blue-600">${product.price}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}