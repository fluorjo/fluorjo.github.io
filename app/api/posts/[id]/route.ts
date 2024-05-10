// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { type NextRequest } from "next/server";

export async function DELETE(
    _request: NextRequest,
    { params }: { params: { id: number } },
) {
    const supabase = await createClient(cookies());
    const { data, error } = await supabase
        .from('Post')
        .delete()
        .eq('id', parseInt(params.id+''));

    if (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    } else {
        return Response.json({ message: 'success' }, { status: 200 });
    }
}