import { Footer } from "../../components/shared/Footer/Footer";
import Advantage from "../Advantage/Advantage";
import Bestseller from "../Bestseller/Bestseller";
import Deal from "../Deal/Deal";
import Entry from "../Entry/Entry";
import Instagram from "../Instagram/Instagram";

export const Home = () => {

  const isWishlistPage = location.pathname === "/wishlist";
  return (
    <>
      <Entry />
      <Bestseller />
      <Deal />
      <Instagram />
      <Advantage />
      {!isWishlistPage && <Footer />}
    </>
  );
};
