# Create compiler output.
../../Libs/closure/closure/bin/build/closurebuilder.py \
--root=../../Libs/closure/ \
--root=../engines/ \
--namespace=Renderer.main \
--output_mode=compiled \
--compiler_jar=../../Libs/closure/compiler.jar \
--compiler_flags=--compilation_level=ADVANCED_OPTIMIZATIONS \
--compiler_flags="--warning_level=VERBOSE" \
--compiler_flags=--language_in=ECMASCRIPT5_STRICT \
--output_file=../bin/compiled.js