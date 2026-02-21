import BlogForm from "@/src/feature/blogs/components/BlogForm";


interface Props {
  params: { id: string };
}

export default function EditBlogPage({ params }: Props) {
  return <BlogForm mode="edit" blogId={params.id} />;
}