import { Gutter } from 'payload/components/elements'
import { AdminViewComponent, AdminViewProps } from 'payload/dist/config/types'
import React, { useEffect, useState } from 'react'
import { useRouteMatch, } from 'react-router-dom'; // React Router hook
import { useParams } from 'react-router-dom';
import { useConfig } from 'payload/components/utilities';
import { Form, FormSubmit, Textarea } from 'payload/components/forms';
import payload from 'payload';
import Input from 'payload/dist/admin/components/forms/field-types/Text/Input';

const ExpensesDefaultView : AdminViewComponent = ({ canAccessAdmin, user, }) => {
  const p = useParams();
  const match = useRouteMatch(); // Get route match info
  const { slug, id } = match.params; // Access slug and document ID
  const { serverURL, routes } = useConfig();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log('slug', slug);
  console.log('id', id);
  console.log("match", match);
  console.log("params", p);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await payload.findByID({
          collection: 'expenses', // required
          id: "2", // required
        });
        setInitialData(res);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching document data:', err);
      }
    };

    fetchData();
  }, [slug, id, serverURL, routes.api]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Gutter>
      <Form
      method="patch"
      action={`${serverURL}${routes.api}/${slug}/${id}`}
      initialData={initialData}
      onSuccess={() => alert('Document updated successfully!')}
    >
      <h1>Edit Document</h1>
      <Input label="Title" name="title" required path='/title'/>
      <Textarea label="Description" name="description" required />
      <Input label="Author" name="author" path='/author' />
      <FormSubmit>Save Changes</FormSubmit>
    </Form>
      </Gutter>
    </>
  )
}

export default ExpensesDefaultView

