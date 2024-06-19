import { Button } from "ui";
import { useHelloQuery } from "../src/store/services/api";

export default function Web() {
  const { data } = useHelloQuery();

  return (
    <div>
      <h1>{data?.message}</h1>
      <h2>manage</h2>
      <Button />
    </div>
  );
}
