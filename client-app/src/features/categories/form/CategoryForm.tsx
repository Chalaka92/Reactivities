import React, { useState, useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { FORM_ERROR } from "final-form";
import { Form, Image, Grid, Icon, Header } from "semantic-ui-react";
import TextInput from "../../../app/common/form/TextInput";
import { CategoryFormValues } from "../../../app/models/category";
import PhotoWidgetDropzone from "../../../app/common/photoUpload/PhotoWidgetDropzone";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const validate = combineValidators({
  name: isRequired("name"),
});

const dropzoneImageStyles = {
  border: "dashed 3px",
  borderColor: "#eee",
  borderRadius: "5px",
  textAlign: "center" as "center",
  height: "200px",
};

const emptyImageStyles = {
  paddingTop: "30px",
};

const CategoryForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { addCategory} = rootStore.categoryStore;

  const [files, setFiles] = useState<any[]>([]);
  const [category] = useState(new CategoryFormValues());

  const onSubmit = async (values: any) => {
    values.file = files[0];
    values.model = category;
    values.model.name = values.name;
    addCategory(values).catch((error) => ({
      [FORM_ERROR]: error,
    }));
  };

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit}) => (
        <Form id="categoryForm" onSubmit={handleSubmit}>
          <Field
            name="name"
            component={TextInput}
            placeholder="Category Name"
          />
          <Grid>
            <Grid.Column width={6}>
              <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={10}>
              {files.length > 0 ? (
                <Image
                  style={dropzoneImageStyles}
                  src={files[0].preview}
                  fluid
                  name="file"
                />
              ) : (
                <div style={{ ...dropzoneImageStyles, ...emptyImageStyles }}>
                  <Icon name="image" size="huge" />
                  <Header content="Preview Area" />
                </div>
              )}
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};
export default observer(CategoryForm);
