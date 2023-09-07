status = statusServer.c
transa = transactionServer.c
flags = -Wextra
libs = operationHandlers.c jsonParserBridge.c
main = main.c
main_lib = $(status) $(transa) $(libs)
exe = main

main: $(main_lib)
	gcc $(main) $(main_lib) $(flags) -o $(exe)

run:
	./$(exe)

clean:
	rm -f $(exe)
