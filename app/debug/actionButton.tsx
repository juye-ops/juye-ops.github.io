// ActionButton.tsx
'use client'; // 이 지시어가 있어야 onClick이 작동합니다.

export function ActionButton({ data }: { data: any }) {
  const action = () => {
    console.log(data);
  };

  return (
    <button className="bg-amber-300 p-2" onClick={action}>
      action
    </button>
  );
}