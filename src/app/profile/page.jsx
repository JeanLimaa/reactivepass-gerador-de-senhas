import TableProfile from "@/components/TableShowProfile/TableProfile";
import LayoutPrivate from "@/components/LayoutPrivate";

export const metadata = {
    title: "Senhas Armazenadas - ReactivePass"
};

export default function Profile() {
    return (
        <LayoutPrivate>
            <TableProfile />
        </LayoutPrivate>
    )
}