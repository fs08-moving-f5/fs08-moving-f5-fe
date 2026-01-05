import FindDriverDetailPage from '@/views/drivers/[id]/FindDriverDetailPage';

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	return <FindDriverDetailPage id={id} disableFavorite={true} />;
}
