import { ReactNode } from "react";
import { HiPlus } from "react-icons/hi2";

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
        name: "Staycations",
        path: "/staycations"
    },
    {
        id: 3,
        name: "Add Events",
        path: "/events/new",
        iconRight:  <HiPlus />
    }
]