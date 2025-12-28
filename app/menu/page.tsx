import dynamic from "next/dynamic";

const MenuClient = dynamic(() => import("./menuclient"), {
  ssr: false,
});

export default function MenuPage() {
  return <MenuClient />;
}
