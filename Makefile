define \n

endef

modules = src/require.js\
          src/homepath.js\
					src/utils.js\
          src/user.js\
          src/request.js\
          src/response.js\
          src/connect.js\
          src/listen.js

fingerjsd: ${modules}
	echo "#!/usr/bin/env node" > $@
	for mod in ${modules} ; do \
    cat >> $@ $$mod && echo ${\n} >> $@ ; \
	done
