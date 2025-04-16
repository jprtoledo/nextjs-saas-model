'use client'

import { Dropdown, DropdownButton, DropdownMenu, DropdownItem, DropdownLabel, DropdownDivider } from "@/components/dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/navbar";
import { Sidebar, SidebarItem, SidebarLabel, SidebarSection, SidebarBody, SidebarSpacer, SidebarFooter } from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";

import { UserIcon, Cog8ToothIcon, ShieldCheckIcon, LightBulbIcon, ArrowRightStartOnRectangleIcon, QuestionMarkCircleIcon, ChevronUpIcon, BellAlertIcon, CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  let triedRefresh = false;
  useEffect(() => {
    const refreshToken = async () => {
      await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
      })
    };
    const getUser = async () => {
      const userResponse = await fetch('/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
      });

      if (!userResponse.ok && !triedRefresh) {
        await refreshToken();
        triedRefresh = true;
        getUser();
      } 

      if (!userResponse.ok) {
        router.push('/auth/login')
      }

      return await userResponse.json();
    };
    
    getUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push('/auth/login')
  }

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <UserIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Configurações</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                {/* <DropdownItem onClick={handleLogout}>
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Fazer Logout</DropdownLabel>
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/dashboard">
                <CalendarDateRangeIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            <SidebarSpacer />
            <SidebarSection>
              <SidebarItem href="/support">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Suporte</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/privacy-policy">
                <ShieldCheckIcon />
                <SidebarLabel>Política de Privacidade</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/terms">
                <LightBulbIcon />
                <SidebarLabel>Termos e Condições</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <UserIcon />
                <SidebarLabel>Perfil</SidebarLabel>
                <ChevronUpIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="top start">
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Configurações</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={handleLogout}>
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Fazer Logout</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}