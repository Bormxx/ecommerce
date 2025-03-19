import Carousel from "@/components/ui/Carousel/Carousel";
import { ECMainBanner } from "@/components/home/ui/ECMainBanner";
import { ECMiniBanner } from "@/components/home/ui/ECMiniBanner";

export function ECHome() {
  // TODO: Запросы на получения данных

  return (
    <div className="mb-28">
      <ECMainBanner />
      <Carousel />
      <ECMiniBanner products={undefined} />
      {/* TODO: Сделать список товаров */}
      {/* TODO: Сделать баннер со списком товаров */}
    </div>
  );
}
