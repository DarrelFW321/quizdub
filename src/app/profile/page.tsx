import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  // Await the session properly
  const session = await getSession();

  if (!session || !session.user) {
    return <div>Loading...</div>;
  }

  const { user } = session;  // Destructure after ensuring session exists

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}