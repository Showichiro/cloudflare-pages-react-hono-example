import {
  useUserCreateFormRenderer,
  useUserListRenderer,
} from "@/features/users/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/users")({
  component: Users,
});

function Users() {
  const { userListRenderer } = useUserListRenderer();
  const { userCreateFormRenderer } = useUserCreateFormRenderer();
  return (
    <div>
      <div>ユーザーリスト</div>
      {userListRenderer()}
      {userCreateFormRenderer()}
      <div>
        <Link to="/">to top</Link>
      </div>
    </div>
  );
}
