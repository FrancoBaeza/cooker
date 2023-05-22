import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/Layout";
import type { ReactElement } from "react";

const Ingredients: NextPageWithLayout = () => {
    return (
        <div className="">hola</div>
    );
}

Ingredients.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Ingredients;