import { CalendarPlus, UserPen, AlarmClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Card = (props: {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  duration: number;
}) => {
  const { id, title, category, date, author, duration } = props;
  return (
    <main
      data-card={id}
      className="w-full h-full p-5 rounded-xl bg-quinary border border-tertiary shadow-lg flex flex-col gap-1 duration-300 hover:shadow-2xl"
    >
      <div className="text-end w-fit text-sm px-2 py-1 rounded-full border border-tertiary shadow-md self-end duration-300 hover:bg-secondary hover:text-white">
        {category}
      </div>
      <h1 className="text-xl max-lg:text-lg max-sm:text-base font-ubuntuSans font-semibold mb-2">
        {title}
      </h1>
      <div className="flex gap-2 items-center">
        <CalendarPlus className="w-4 h-4" />
        <p className="text-xs">{date}</p>
      </div>
      <div className="flex gap-2 items-center">
        <UserPen className="w-4 h-4" />
        <p className="text-xs">Author: {author}</p>
      </div>
      <div className="flex gap-2 items-center">
        <AlarmClock className="w-4 h-4" />
        <p className="text-xs">Durasi: {duration / 3600} Menit</p>
      </div>
      <Link className="w-full mt-4" href={`/tryout/${id}`}>
        <Button className="w-full rounded-lg border-2" variant={"secondary"}>
          Mulai Try Out
        </Button>
      </Link>
    </main>
  );
};
export default Card;
