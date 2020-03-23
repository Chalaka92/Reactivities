import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { IProfile } from "../../app/models/profile";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
  displayName: isRequired("displayName")
});
interface IProps {
  updateProfile: (profile: Partial<IProfile>) => void;
  profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
      onSubmit={updateProfile}
      initialValues={profile!}
      validate={validate}
      render={({ handleSubmit, submitting, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            placeholder="Display Name"
            component={TextInput}
            value={profile!.displayName}
          />
          <Field
            name="bio"
            component={TextAreaInput}
            rows={3}
            placeholder="Bio"
            value={profile!.bio}
          />
          <Button
            loading={submitting}
            floated="right"
            disabled={invalid || pristine}
            positive
            content="Update Profile"
          />
        </Form>
      )}
    />
  );
};

export default observer(ProfileEditForm);
