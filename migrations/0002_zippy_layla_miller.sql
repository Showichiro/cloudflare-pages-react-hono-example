CREATE TABLE `tokens` (
	`id` integer PRIMARY KEY NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text NOT NULL,
	`id_token` text NOT NULL,
	`expires_in` integer NOT NULL
);
