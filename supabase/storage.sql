-- Run after schema.sql. Creates the storage bucket used for uploaded
-- photos/videos and opens public read access (uploads still go through the
-- service-role client, so no public insert policy is needed).

insert into storage.buckets (id, name, public)
values ('card-media', 'card-media', true)
on conflict (id) do nothing;

create policy "card-media is publicly readable"
  on storage.objects for select
  using (bucket_id = 'card-media');
