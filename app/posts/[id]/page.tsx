import PostPage from '@/components/PostPage';
import { getPost } from '@/utils/fetch';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PostProps = { params: { id: string } };

export const generateMetadata = async ({
    params,
}: PostProps): Promise<Metadata> => {
    const post = await getPost(params.id);

    return {
        title: post?.title,
        description: post?.content?.split('.')[0],
        openGraph: post?.preview_image_url
            ? {
                  images: [
                      {
                          url: post.preview_image_url,
                      },
                  ],
              }
            : undefined,
    };
};

export const generateStaticParams = async () => {
    const supabase = createClient();
    const { data } = await supabase.from('Post').select('id');
    return data?.map(({ id }) => ({ params: { id: id.toString() } })) ?? [];
};

export const revalidate = 0;

export default async function Post({ params }: PostProps) {
    const post = await getPost(params.id);

    if (!post) return notFound();
    return <PostPage {...post} />;
}
