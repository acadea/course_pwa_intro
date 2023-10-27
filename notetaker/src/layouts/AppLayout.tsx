import { AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { PropsWithChildren } from 'react'

export default function AppLayout({children} : PropsWithChildren) {
  const [opened, {toggle}] = useDisclosure();
  return (
    <AppShell
      header={{height: 60}}
      navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: true}}}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        
        {/* TODO: sidebar */}

      </AppShell.Navbar>
      <AppShell.Main>
        <section >
          {children}
        </section>
      </AppShell.Main>

    </AppShell>
  )
}
