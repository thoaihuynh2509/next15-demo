export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`,
    {
      cache: "no-store", // always fetch fresh data (good for SSR demo)
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const user = await res.json();

  return (
    <div>
      <h1>User Detail</h1>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
    </div>
  );
};