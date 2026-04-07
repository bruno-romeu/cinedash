import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { Bookmark } from "lucide-react";
import { CirclePlay } from "lucide-react";


export default function MovieActions({
    onAddToList,
    onMarkAsWatched,
    isInList = false,
    isWatched = false,
    isLoading = false,
}) {
    return (
        <div className="relative z-10 mt-2 flex w-full flex-col gap-3 sm:flex-row">
            <PrimaryButton
                className="w-full justify-center gap-2"
                onClick={onAddToList}
                disabled={isLoading}
            >
                <Bookmark size={18} />
                <span>{isInList ? "Na Lista" : "Adicionar à Lista"}</span>
            </PrimaryButton>
            <SecondaryButton
                className="w-full justify-center gap-2"
                onClick={onMarkAsWatched}
                disabled={isLoading}
            >
                <CirclePlay size={18} />
                <span>{isWatched ? "Assistido" : "Marcar como Assistido"}</span>
            </SecondaryButton>
        </div>
    );
}