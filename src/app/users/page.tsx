import UsersList from "@/features/users/components/UserList";

export default async function UsersPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <div>
      <h1>UsersPage</h1>

      <UsersList users={users} />
    </div>
  );
}