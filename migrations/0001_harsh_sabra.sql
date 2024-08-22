ALTER TABLE `resources` RENAME TO `users`;--> statement-breakpoint
ALTER TABLE `users` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `title`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `href`;