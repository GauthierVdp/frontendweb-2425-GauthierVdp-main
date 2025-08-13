-- RenameIndex
ALTER TABLE `_authorsonbooks` RENAME INDEX `_AuthorsOnBooks_AB_unique` TO `_authorsonbooks_AB_unique`;

-- RenameIndex
ALTER TABLE `_authorsonbooks` RENAME INDEX `_AuthorsOnBooks_B_index` TO `_authorsonbooks_B_index`;

-- RenameIndex
ALTER TABLE `_genresonbooks` RENAME INDEX `_GenresOnBooks_AB_unique` TO `_genresonbooks_AB_unique`;

-- RenameIndex
ALTER TABLE `_genresonbooks` RENAME INDEX `_GenresOnBooks_B_index` TO `_genresonbooks_B_index`;
