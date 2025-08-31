import { TopMenu } from "@/components/TopMenu";

interface Props {
  children: React.ReactNode;
}

const ShopLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <div className="mx-0 md:mx-10">{children}</div>
    </main>
  );
};

export default ShopLayout;