'use client';

import { useEffect, useState } from 'react';
import { Heading } from '@/components/heading';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@/components/table';
import { Text } from '@/components/text';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  return (
    <div>
      <Heading>Dashboard</Heading>
      <Text>Bem vindo, {user?.email}. </Text>
      
      <Table className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]">
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Handle</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Access</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {[{handle: 'test', role: 'admin', email: 'test@test.com', access: 'active', name: 'Test User'}].map((user) => (
          <TableRow key={user.handle}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>@{user.handle}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-zinc-500">{user.access}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
} 