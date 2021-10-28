import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../shared/components/Modal/Modal.module.scss';
import { SectionAlias } from '../../shared/enums/section-alias.enum';
import { addTask } from '../../shared/store';

export const CreateTaskForm: React.FC<{
  sectionAlias: SectionAlias;
  onClose: () => void;
}> = ({ sectionAlias, onClose }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (values: { title: string; content: string }) => {
    addTask({
      sectionAlias,
      id: '',
      title: values.title,
      content: values.content,
      creationDate: new Date(),
      completed: false,
    });
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__item}>
        <label className={styles.form__label} htmlFor="taskTitle">
          Title
        </label>
        <input {...register('title', { required: true })} className={styles.form__input} id="taskTitle" name="title" type="text" />
      </div>
      <div className={styles.form__item}>
        <label className={styles.form__label} htmlFor="taskContent">
          Text
        </label>
        <textarea {...register('content', { required: true })} className={styles.form__input} id="taskContent" name="content" />
      </div>
      <button className={styles['form__submit-btn']} type="submit">
        Create
      </button>
    </form>
  );
};
