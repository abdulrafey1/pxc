from pxc.lib.sandbox import stderr_collector


class TestStderrCollector:
    """Tests for the callback that gathers what a sandbox writes to stderr."""

    def test_decodes_a_character_split_across_chunks(self) -> None:
        chunks: list[str] = []
        collect = stderr_collector(chunks)
        encoded = "café".encode("utf-8")

        collect(encoded[:-1])
        collect(encoded[-1:])

        assert "".join(chunks) == "café"

    def test_replaces_invalid_bytes(self) -> None:
        chunks: list[str] = []

        stderr_collector(chunks)(b"a\xffb")

        assert "".join(chunks) == "a�b"
