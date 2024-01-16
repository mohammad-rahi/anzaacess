import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa";

type HeaderMenuTypes = {
    id: number;
    name: string;
    path: string
    iconRight?: ReactNode
}

export const HeaderMenues: HeaderMenuTypes[] = [
    {
        id: 1,
        name: "Events",
        path: "/events"
    },
    {
        id: 2,
        name: "Add Events",
        path: "/events/new",
        iconRight:  <FaPlus />
    }
]