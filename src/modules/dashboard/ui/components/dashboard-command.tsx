import { ResponsiveCommandDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

import React, { Dispatch, SetStateAction } from 'react'

interface Props {
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>;

}
const DashboardCommand = ({open,setOpen}:Props) => {
  return (<ResponsiveCommandDialog open={open} onOpenChange={setOpen}>
    <CommandInput placeholder='Search Anything'/>
    <CommandList>
        <CommandItem>
            Test
        </CommandItem>
    </CommandList>
  </ResponsiveCommandDialog>
  )
}

export default DashboardCommand