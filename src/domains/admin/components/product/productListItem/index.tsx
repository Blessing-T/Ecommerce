"use client";
import { useState } from "react";

import { deleteProduct, getProductForEdit, updateProduct } from "@/actions/product/product";
import Button from "@/shared/components/UI/button";
import Popup from "@/shared/components/UI/popup";
import { TProductListItem } from "@/shared/types/product";
import ProductForm from "@/domains/admin/components/product/productForm";
import { TAddProductFormValues } from "@/shared/types/product";

type TProps = {
  data: TProductListItem;
  requestReload: () => void;
};

const ProductListItem = ({ data, requestReload }: TProps) => {
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [formValues, setFormValues] = useState<TAddProductFormValues | null>(null);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteProduct(data.id);
    if (response.error) {
      setIsLoading(false);
    }
    if (response.res) {
      setIsLoading(false);
      requestReload();
    }
  };

  const handleShowEdit = async () => {
    setIsEditLoading(true);
    const response = await getProductForEdit(data.id);
    if (response.error) {
      setIsEditLoading(false);
      return;
    }
    if (response.res) {
      setFormValues(response.res.formValues);
      setShowEdit(true);
    }
    setIsEditLoading(false);
  };

  const handleUpdate = async () => {
    if (!formValues) return;
    setIsEditLoading(true);
    const response = await updateProduct(data.id, formValues);
    if (response.error) {
      setIsEditLoading(false);
      return;
    }
    setIsEditLoading(false);
    setShowEdit(false);
    requestReload();
  };

  return (
    <div className="w-full h-12 px-4 grid grid-cols-3 justify-between items-center text-sm text-gray-800 rounded-lg transition-colors duration-300 select-none hover:bg-gray-100">
      <span className={"styles.name"}>{data.name}</span>
      <span className={"styles.category"}>{data.category.name}</span>
      <div className="flex gap-2 justify-end">
        <Button onClick={() => handleShowEdit()}>Edit</Button>
        <Button onClick={() => setShowDelete(true)}>Delete</Button>
      </div>
      {showDelete && (
        <Popup
          content={<span className="block text-center p-6 pb-10">Are You Sure?</span>}
          width="300px"
          isLoading={isLoading}
          onCancel={() => setShowDelete(false)}
          onClose={() => setShowDelete(false)}
          onSubmit={() => handleDelete()}
          cancelBtnText="NO"
          confirmBtnText="YES"
        />
      )}
      {showEdit && (
        <Popup
          content={
            <div className="p-2">
              {formValues ? (
                <ProductForm formValues={formValues} onChange={(v) => setFormValues(v)} />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          }
          width="800px"
          isLoading={isEditLoading}
          onCancel={() => setShowEdit(false)}
          onClose={() => setShowEdit(false)}
          onSubmit={() => handleUpdate()}
          cancelBtnText="Cancel"
          confirmBtnText="Update"
        />
      )}
    </div>
  );
};

export default ProductListItem;
