import { ActionButton } from "./actionButton";

export default async function debug() {
  const action = () => {
    console.log("debug");
  }

  return (
    <>
      <ActionButton data={"debug"}/>
    </>
  )
}