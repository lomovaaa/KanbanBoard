import { Field, Form, Formik } from 'formik';
import React from 'react';
import { addTask } from '../../shared/store';
import '../../shared/components/Modal/Modal.scss';

export const CreateTaskForm: React.FC<{
  sectionAlias: string;
  onClose: () => void;
}> = ({ sectionAlias, onClose }) => {
  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
      }}
      onSubmit={(values) => {
        addTask({
          sectionAlias,
          id: '',
          title: values.title,
          content: values.content,
          creationDate: new Date(),
          completed: false,
        });
        onClose();
      }}
    >
      <Form className="form">
        <div className="form__item">
          <label className="form__label" htmlFor="taskTitle">
            Title
          </label>
          <Field className="form__input" id="taskTitle" name="title" />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="taskContent">
            Text
          </label>
          <Field className="form__input" id="taskContent" name="content" />
        </div>
        <div>
          <button className="form__submit-btn" type="submit">
            Create
          </button>
        </div>
      </Form>
    </Formik>
  );
};
