import { Button } from '@/components/ui/button'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

/**
 * 用户菜单按钮
 * @returns
 */
export default function MenuButton() {
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen((state) => !state)
  }

  return (
    <Drawer>
      <DrawerTrigger>
        <Button onClick={handleClick}>{open ? <X /> : <Menu />}</Button>
      </DrawerTrigger>
    </Drawer>
  )
}
