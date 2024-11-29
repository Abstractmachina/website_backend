import React from 'react';
import { useForm } from 'payload/components/forms';
import { useHistory } from 'react-router-dom';

const SaveAndCloseButton: React.FC = () => {
  const { submit } = useForm(); // Get the form submission handler
  const history = useHistory(); // History object to handle navigation

  const handleSaveAndClose = async (): Promise<void> => {
    try {
      await submit(); // Save the document
      // Navigate back to the list view after saving
      const basePath = `/admin/collections/expenses`;
      history.push(basePath);
    } catch (error) {
      console.error('Error saving the document:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSaveAndClose}
      className="custom-save-button"
    >
      Save & Close
    </button>
  );
};

export default SaveAndCloseButton;
