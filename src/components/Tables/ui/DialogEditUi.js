import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import React from 'react'

export default function DialogEditUi({
    dialogTitle="Edición",
    children,
    openDialog,
    handleOpenChangeDialog
}) {
  return (
    <>
        <Dialog open={openDialog} onOpenChange={handleOpenChangeDialog}>
            <DialogContent>
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <section>
                    {children}
                </section>
            </DialogContent>
        </Dialog>
    </>
  )
};
