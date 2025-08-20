'use client'

import { useRouter } from "next/navigation";


export default function UsersList({ users }: { users: any[] }) {
  const router = useRouter();

  const handleClickUser = (user: any) => {
    // Navigate to the user detail page
    router.push(`/users/${user.id}`);
  };

  return (
    <ul>
      {users.map((user, index) => (
        <li key={user.id} onClick={() => handleClickUser(user)}>
          {index} - {user.name}
        </li>
      ))}
    </ul>
  );
}